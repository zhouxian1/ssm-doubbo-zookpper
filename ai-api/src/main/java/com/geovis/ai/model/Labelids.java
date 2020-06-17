package com.geovis.ai.model;

import java.io.Serializable;
import java.util.Date;

public class Labelids implements Serializable {
    /**
     * 
     */
    private Integer id;

    /**
     * 标签id
     */
    private Integer labelid;

    /**
     * 对应id
     */
    private Integer platid;

    /**
     * 类型分类
     */
    private String type;

    /**
     * 默认0  delete :1
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
     * labelids
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
     * 标签id
     * @return labelid 标签id
     */
    public Integer getLabelid() {
        return labelid;
    }

    /**
     * 标签id
     * @param labelid 标签id
     */
    public void setLabelid(Integer labelid) {
        this.labelid = labelid;
    }

    /**
     * 对应id
     * @return platid 对应id
     */
    public Integer getPlatid() {
        return platid;
    }

    /**
     * 对应id
     * @param platid 对应id
     */
    public void setPlatid(Integer platid) {
        this.platid = platid;
    }

    /**
     * 类型分类
     * @return type 类型分类
     */
    public String getType() {
        return type;
    }

    /**
     * 类型分类
     * @param type 类型分类
     */
    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    /**
     * 默认0  delete :1
     * @return is_del 默认0  delete :1
     */
    public Byte getIsDel() {
        return isDel;
    }

    /**
     * 默认0  delete :1
     * @param isDel 默认0  delete :1
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