package com.geovis.ai.web.shiro;

import org.apache.shiro.session.Session;
import org.apache.shiro.session.SessionListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 */
public class MySessionListener implements SessionListener {

    private static Logger _log = LoggerFactory.getLogger(MySessionListener.class);

    @Override
    public void onStart(Session session) {
        _log.debug("会话创建：" + session.getId());
    }

    @Override
    public void onStop(Session session) {
        _log.debug("会话停止：" + session.getId());
    }

    @Override
    public void onExpiration(Session session) {
        _log.debug("会话过期：" + session.getId());
    }

}
