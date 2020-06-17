package com.geovis.ai.model;

import java.io.Serializable;
import java.util.Date;

public class Orders implements Serializable {
    /**
     * 
     */
    private Integer id;

    /**
     * 用户id
     */
    private Long userId;

    /**
     * 数量
     */
    private Integer price;

    /**
     * 关联id
     */
    private Integer relevanceId;

    /**
     * 关联类型 （表名作为关联分类）
     */
    private String type;

    /**
     * 插件包 默认0  delete :1
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
     * orders
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
     * 数量
     * @return price 数量
     */
    public Integer getPrice() {
        return price;
    }

    /**
     * 数量
     * @param price 数量
     */
    public void setPrice(Integer price) {
        this.price = price;
    }

    /**
     * 关联id
     * @return relevance_id 关联id
     */
    public Integer getRelevanceId() {
        return relevanceId;
    }

    /**
     * 关联id
     * @param relevanceId 关联id
     */
    public void setRelevanceId(Integer relevanceId) {
        this.relevanceId = relevanceId;
    }

    /**
     * 关联类型 （表名作为关联分类）
     * @return type 关联类型 （表名作为关联分类）
     */
    public String getType() {
        return type;
    }

    /**
     * 关联类型 （表名作为关联分类）
     * @param type 关联类型 （表名作为关联分类）
     */
    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    /**
     * 插件包 默认0  delete :1
     * @return is_del 插件包 默认0  delete :1
     */
    public Byte getIsDel() {
        return isDel;
    }

    /**
     * 插件包 默认0  delete :1
     * @param isDel 插件包 默认0  delete :1
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
}