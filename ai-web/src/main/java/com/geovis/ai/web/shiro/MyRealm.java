package com.geovis.ai.web.shiro;

import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Set;

/**
 * 用户认证和授权
 */
public class MyRealm extends AuthorizingRealm {

    private static Logger _log = LoggerFactory.getLogger(MyRealm.class);

    
   /* @Autowired
    private UserService userService;
    
    @Autowired
    private RoleService roleService;
    
    @Autowired
    private PermissionService permissionService;*/

    /**
     * 授权：验证权限时调用
     * @param principalCollection
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
       /* String username = (String) principalCollection.getPrimaryPrincipal();
        User user = getUser(username);

        // 当前用户所有角色
        Set<String> roles = getUserRole(user.getId());
        

        // 当前用户所有权限
        Set<String> permissions = getUserPermission(user.getId());
        

        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
        simpleAuthorizationInfo.setStringPermissions(permissions);
        simpleAuthorizationInfo.setRoles(roles);*/
        return null;//simpleAuthorizationInfo;
    }

    /**
     * 认证：登录时调用
     * @param authenticationToken
     * @return
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        /*String username = (String) authenticationToken.getPrincipal();
        String password = new String((char[]) authenticationToken.getCredentials());
        // client无密认证
//        String type = PropertiesFileUtil.getInstance("config").get("sys.type");
//        if ("client".equals(type)) {
//            return new SimpleAuthenticationInfo(username, password, getName());
//        }

        // 查询用户信息
        User user = getUser(username);

        if (null == user) {
            throw new UnknownAccountException();
        }
        if (!user.getPassword().equals(MD5Util.md5(password , username))) {
            throw new IncorrectCredentialsException();
        }
//        if (user.getLocked() == 1) {
//            throw new LockedAccountException();
//        }*/
        return null;//new SimpleAuthenticationInfo(username, password, getName());
    }
    


    private Set<String> getUserRole(long userId){
        return null;
    }
    
    private Set<String> getUserPermission(long userId){
        return null;
    }

}
