package com.geovis.ai.model;

import java.io.Serializable;
import java.util.Date;

public class Labels implements Serializable {
    /**
     * 
     */
    private Integer id;

    /**
     * 标题
     */
    private String title;

    /**
     * 用户id
     */
    private Long userId;

    /**
     * 分类类型
     */
    private Byte type;

    /**
     * 是否删除：0否1是
     */
    private Byte isDel;

    /**
     * 
     */
    private Date createdAt;

    /**
     * 
     */
    private Date updatedAt;

    /**
     * 介绍
     */
    private String introduction;

    /**
     * labels
     */
    private static final long serialVersionUID = 1L;

    /**
     * 
     * @return id 
     */
    public Integer getId() {
        return id;
    }

    /**
     * 
     * @param id 
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 标题
     * @return title 标题
     */
    public String getTitle() {
        return title;
    }

    /**
     * 标题
     * @param title 标题
     */
    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    /**
     * 用户id
     * @return user_id 用户id
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * 用户id
     * @param userId 用户id
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    /**
     * 分类类型
     * @return type 分类类型
     */
    public Byte getType() {
        return type;
    }

    /**
     * 分类类型
     * @param type 分类类型
     */
    public void setType(Byte type) {
        this.type = type;
    }

    /**
     * 是否删除：0否1是
     * @return is_del 是否删除：0否1是
     */
    public Byte getIsDel() {
        return isDel;
    }

    /**
     * 是否删除：0否1是
     * @param isDel 是否删除：0否1是
     */
    public void setIsDel(Byte isDel) {
        this.isDel = isDel;
    }

    /**
     * 
     * @return created_at 
     */
    public Date getCreatedAt() {
        return createdAt;
    }

    /**
     * 
     * @param createdAt 
     */
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    /**
     * 
     * @return updated_at 
     */
    public Date getUpdatedAt() {
        return updatedAt;
    }

    /**
     * 
     * @param updatedAt 
     */
    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    /**
     * 介绍
     * @return introduction 介绍
     */
    public String getIntroduction() {
        return introduction;
    }

    /**
     * 介绍
     * @param introduction 介绍
     */
    public void setIntroduction(String introduction) {
        this.introduction = introduction == null ? null : introduction.trim();
    }
}