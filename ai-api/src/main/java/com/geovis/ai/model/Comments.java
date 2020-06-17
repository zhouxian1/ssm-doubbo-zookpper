package com.geovis.ai.model;

import java.io.Serializable;
import java.util.Date;

public class Comments implements Serializable {
    /**
     * 
     */
    private Integer id;

    /**
     * 用户id
     */
    private Long userId;

    /**
     * 关联id
     */
    private Integer relevanceId;

    /**
     * 星级
     */
    private Byte starRating;

    /**
     * 评论类型
     */
    private Byte type;

    /**
     * 评论状态
     */
    private Byte status;

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
     * 内容
     */
    private String content;

    /**
     * comments
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
     * 星级
     * @return star_rating 星级
     */
    public Byte getStarRating() {
        return starRating;
    }

    /**
     * 星级
     * @param starRating 星级
     */
    public void setStarRating(Byte starRating) {
        this.starRating = starRating;
    }

    /**
     * 评论类型
     * @return type 评论类型
     */
    public Byte getType() {
        return type;
    }

    /**
     * 评论类型
     * @param type 评论类型
     */
    public void setType(Byte type) {
        this.type = type;
    }

    /**
     * 评论状态
     * @return status 评论状态
     */
    public Byte getStatus() {
        return status;
    }

    /**
     * 评论状态
     * @param status 评论状态
     */
    public void setStatus(Byte status) {
        this.status = status;
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
     * 内容
     * @return content 内容
     */
    public String getContent() {
        return content;
    }

    /**
     * 内容
     * @param content 内容
     */
    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }
}