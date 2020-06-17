package com.geovis.ai.web.shiro;

import com.geovis.ai.web.shiro.*;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.mgt.SessionContext;
import org.apache.shiro.session.mgt.SessionFactory;
import org.apache.shiro.web.session.mgt.WebSessionContext;

import javax.servlet.http.HttpServletRequest;

/**
 * session工厂
 */
public class MySessionFactory implements SessionFactory {

    @Override
    public Session createSession(SessionContext sessionContext) {
        com.geovis.ai.web.shiro.MySession session = new com.geovis.ai.web.shiro.MySession();
        if (null != sessionContext && sessionContext instanceof WebSessionContext) {
            WebSessionContext webSessionContext = (WebSessionContext) sessionContext;
            HttpServletRequest request = (HttpServletRequest) webSessionContext.getServletRequest();
            if (null != request) {
                session.setHost(request.getRemoteAddr());
                session.setUserAgent(request.getHeader("User-Agent"));
            }
        }
        return session;
    }

}
