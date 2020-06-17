package com.geovis.ai.web.shiro;

import com.geovis.ai.web.shiro.*;
import com.geovis.ai.web.util.SerializableUtil;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.mgt.ValidatingSession;
import org.apache.shiro.session.mgt.eis.CachingSessionDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.geovis.ai.util.RedisUtil;

import redis.clients.jedis.Jedis;

import java.io.Serializable;
import java.util.*;

/**
 * 基于redis的sessionDao，缓存共享session
 */
public class MySessionDao extends CachingSessionDAO {

    private static Logger _log = LoggerFactory.getLogger(MySessionDao.class);
    // 会话key
    private final static String SYS_SHIRO_SESSION_ID = "sys-shiro-session-id";
//    // 全局会话key
//    private final static String SYS_SERVER_SESSION_ID = "sys-server-session-id";
//    // 全局会话列表key
//    private final static String SYS_SERVER_SESSION_IDS = "sys-server-session-ids";
//    // code key
//    private final static String SYS_SERVER_CODE = "sys-server-code";
//    // 局部会话key
//    private final static String SYS_CLIENT_SESSION_ID = "sys-client-session-id";
//    // 单点同一个code所有局部会话key
//    private final static String SYS_CLIENT_SESSION_IDS = "sys-client-session-ids";

    @Override
    protected Serializable doCreate(Session session) {
        Serializable sessionId = generateSessionId(session);
        assignSessionId(session, sessionId);
        RedisUtil.set(SYS_SHIRO_SESSION_ID + "_" + sessionId, SerializableUtil.serialize(session), (int) session.getTimeout() / 1000);
        _log.debug("doCreate >>>>> sessionId={}", sessionId);
        return sessionId;
    }

    @Override
    protected Session doReadSession(Serializable sessionId) {
        String session = RedisUtil.get(SYS_SHIRO_SESSION_ID + "_" + sessionId);
        _log.debug("doReadSession >>>>> sessionId={}", sessionId);
        return SerializableUtil.deserialize(session);
    }

    @Override
    protected void doUpdate(Session session) {
        // 如果会话过期/停止 没必要再更新了
        if(session instanceof ValidatingSession && !((ValidatingSession)session).isValid()) {
            return;
        }
        // 更新session的最后一次访问时间
        com.geovis.ai.web.shiro.MySession mySession = (com.geovis.ai.web.shiro.MySession) session;
        com.geovis.ai.web.shiro.MySession cacheSession = (com.geovis.ai.web.shiro.MySession) doReadSession(session.getId());
        if (null != cacheSession) {
        	mySession.setStatus(cacheSession.getStatus());
        	mySession.setAttribute("FORCE_LOGOUT", cacheSession.getAttribute("FORCE_LOGOUT"));
        }
        RedisUtil.set(SYS_SHIRO_SESSION_ID + "_" + session.getId(), SerializableUtil.serialize(session), (int) session.getTimeout() / 1000);
        // 更新ZHENG_UPMS_SERVER_SESSION_ID、ZHENG_UPMS_SERVER_CODE过期时间 TODO
        _log.debug("doUpdate >>>>> sessionId={}", session.getId());
    }

    @Override
    protected void doDelete(Session session) {
        String sessionId = session.getId().toString();
//        String type = ObjectUtils.toString(session.getAttribute(BaseConstants.SYS_TYPE));
//        if ("client".equals(type)) {
//            // 删除局部会话和同一code注册的局部会话
//            String code = RedisUtil.get(SYS_CLIENT_SESSION_ID + "_" + sessionId);
//            Jedis jedis = RedisUtil.getJedis();
//            jedis.del(SYS_CLIENT_SESSION_ID + "_" + sessionId);
//            jedis.srem(SYS_CLIENT_SESSION_IDS + "_" + code, sessionId);
//            jedis.close();
//        }
//        if ("server".equals(type)) {
//            // 当前全局会话code
//            String code = RedisUtil.get(SYS_SERVER_SESSION_ID + "_" + sessionId);
//            // 清除全局会话
//            RedisUtil.remove(SYS_SERVER_SESSION_ID + "_" + sessionId);
//            // 清除code校验值
//            RedisUtil.remove(SYS_SERVER_CODE + "_" + code);
//            // 清除所有局部会话
//            Jedis jedis = RedisUtil.getJedis();
//            Set<String> clientSessionIds = jedis.smembers(SYS_CLIENT_SESSION_IDS + "_" + code);
//            for (String clientSessionId : clientSessionIds) {
//                jedis.del(SYS_CLIENT_SESSION_ID + "_" + clientSessionId);
//                jedis.srem(SYS_CLIENT_SESSION_IDS + "_" + code, clientSessionId);
//            }
//            _log.debug("当前code={}，对应的注册系统个数：{}个", code, jedis.scard(SYS_CLIENT_SESSION_IDS + "_" + code));
//            jedis.close();
//            // 维护会话id列表，提供会话分页管理
//            RedisUtil.lrem(SYS_SERVER_SESSION_IDS, 1, sessionId);
//        }
        // 删除session
        RedisUtil.remove(SYS_SHIRO_SESSION_ID + "_" + sessionId);
        _log.debug("doUpdate >>>>> sessionId={}", sessionId);
    }

    /**
     * 获取会话列表
     * @param offset
     * @param limit
     * @return
     */
    public Map getActiveSessions(int offset, int limit) {
        Map sessions = new HashMap();
        Jedis jedis = RedisUtil.getJedis();
        // 获取在线会话总数
        long total = jedis.llen(SYS_SHIRO_SESSION_ID);
        // 获取当前页会话详情
        List<String> ids = jedis.lrange(SYS_SHIRO_SESSION_ID, offset, (offset + limit - 1));
        List<Session> rows = new ArrayList<>();
        for (String id : ids) {
            String session = RedisUtil.get(SYS_SHIRO_SESSION_ID + "_" + id);
            // 过滤redis过期session
            if (null == session) {
//                RedisUtil.lrem(SYS_SERVER_SESSION_IDS, 1, id);
                total = total - 1;
                continue;
            }
             rows.add(SerializableUtil.deserialize(session));
        }
        jedis.close();
        sessions.put("total", total);
        sessions.put("rows", rows);
        return sessions;
    }

    /**
     * 强制退出
     * @param ids
     * @return
     */
    public int forceout(String ids) {
        String[] sessionIds = ids.split(",");
        for (String sessionId : sessionIds) {
            // 会话增加强制退出属性标识，当此会话访问系统时，判断有该标识，则退出登录
            String session = RedisUtil.get(SYS_SHIRO_SESSION_ID + "_" + sessionId);
            com.geovis.ai.web.shiro.MySession upmsSession = (com.geovis.ai.web.shiro.MySession) SerializableUtil.deserialize(session);
            upmsSession.setStatus(com.geovis.ai.web.shiro.MySession.OnlineStatus.force_logout);
            upmsSession.setAttribute("FORCE_LOGOUT", "FORCE_LOGOUT");
            RedisUtil.set(SYS_SHIRO_SESSION_ID + "_" + sessionId, SerializableUtil.serialize(upmsSession), (int) upmsSession.getTimeout() / 1000);
        }
        return sessionIds.length;
    }

    /**
     * 更改在线状态
     *
     * @param sessionId
     * @param onlineStatus
     */
    public void updateStatus(Serializable sessionId, com.geovis.ai.web.shiro.MySession.OnlineStatus onlineStatus) {
        com.geovis.ai.web.shiro.MySession session = (com.geovis.ai.web.shiro.MySession) doReadSession(sessionId);
        if (null == session) {
            return;
        }
        session.setStatus(onlineStatus);
        RedisUtil.set(SYS_SHIRO_SESSION_ID + "_" + session.getId(), SerializableUtil.serialize(session), (int) session.getTimeout() / 1000);
    }

}
