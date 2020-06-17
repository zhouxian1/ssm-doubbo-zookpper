package com.geovis.ai.model;

import java.io.Serializable;
import java.util.Date;

public class Rotation implements Serializable {
    /**
     * 
     */
    private Integer id;

    /**
     * 分组id
     */
    private Integer groupid;

    /**
     * 名称
     */
    private String name;

    /**
     * 地址
     */
    private String url;

    /**
     * 是否删除：0否1是
     */
    private Byte isDel;

    /**
     * 排序
     */
    private Byte sort;

    /**
     * 状态
     */
    private Byte status;

    /**
     * 
     */
    private Date createdAt;

    /**
     * 
     */
    private Date updatedAt;

    /**
     * 简短描述
     */
    private String image;

    /**
     * rotation
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
     * 分组id
     * @return groupid 分组id
     */
    public Integer getGroupid() {
        return groupid;
    }

    /**
     * 分组id
     * @param groupid 分组id
     */
    public void setGroupid(Integer groupid) {
        this.groupid = groupid;
    }

    /**
     * 名称
     * @return name 名称
     */
    public String getName() {
        return name;
    }

    /**
     * 名称
     * @param name 名称
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    /**
     * 地址
     * @return url 地址
     */
    public String getUrl() {
        return url;
    }

    /**
     * 地址
     * @param url 地址
     */
    public void setUrl(String url) {
        this.url = url == null ? null : url.trim();
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
     * 排序
     * @return sort 排序
     */
    public Byte getSort() {
        return sort;
    }

    /**
     * 排序
     * @param sort 排序
     */
    public void setSort(Byte sort) {
        this.sort = sort;
    }

    /**
     * 状态
     * @return status 状态
     */
    public Byte getStatus() {
        return status;
    }

    /**
     * 状态
     * @param status 状态
     */
    public void setStatus(Byte status) {
        this.status = status;
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
     * 简短描述
     * @return image 简短描述
     */
    public String getImage() {
        return image;
    }

    /**
     * 简短描述
     * @param image 简短描述
     */
    public void setImage(String image) {
        this.image = image == null ? null : image.trim();
    }
}