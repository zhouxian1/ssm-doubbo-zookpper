package com.geovis.ai.web.shiro;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

/*
 * 在httl模板上可以直接使用的函数
 */
public class ShiroKit {
    /**
     * 禁止初始化
     */
    private ShiroKit() {
    }
    /**
     * 获取 Subject
     * 
     * @return Subject
     */
    protected static Subject getSubject() {
        return SecurityUtils.getSubject();
    }
    /**
     * 验证当前用户是否拥有指定权限,使用时与lacksPermission 搭配使用
     * 
     * @param permission
     *            权限名
     * @return 拥有权限：true，否则false
     */
    public static boolean hasPermission(String permission) {
        boolean ret = getSubject() != null && permission != null && permission.length() > 0 && getSubject().isPermitted(permission);
        return ret;
    }

    /**
     * 与hasPermission标签逻辑相反，当前用户没有制定权限时，验证通过。
     * 
     * @param permission
     *            权限名
     * @return 拥有权限：true，否则false
     */
    public static boolean lacksPermission(String permission) {
        return !hasPermission(permission);
    }

}