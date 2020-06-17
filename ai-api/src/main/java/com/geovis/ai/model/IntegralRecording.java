package com.geovis.ai.model;

import java.io.Serializable;
import java.util.Date;

public class IntegralRecording implements Serializable {
    /**
     * 
     */
    private Integer id;

    /**
     * 积分id
     */
    private Integer integralId;

    /**
     * 用户id
     */
    private Long userId;

    /**
     *  状态 默认0支出 1收入 
     */
    private Byte payType;

    /**
     * 数量
     */
    private Integer price;

    /**
     * 原因
     */
    private String reason;

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
     * integral_recording
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
     * 积分id
     * @return integral_id 积分id
     */
    public Integer getIntegralId() {
        return integralId;
    }

    /**
     * 积分id
     * @param integralId 积分id
     */
    public void setIntegralId(Integer integralId) {
        this.integralId = integralId;
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
     *  状态 默认0支出 1收入 
     * @return pay_type  状态 默认0支出 1收入 
     */
    public Byte getPayType() {
        return payType;
    }

    /**
     *  状态 默认0支出 1收入 
     * @param payType  状态 默认0支出 1收入 
     */
    public void setPayType(Byte payType) {
        this.payType = payType;
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
     * 原因
     * @return reason 原因
     */
    public String getReason() {
        return reason;
    }

    /**
     * 原因
     * @param reason 原因
     */
    public void setReason(String reason) {
        this.reason = reason == null ? null : reason.trim();
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