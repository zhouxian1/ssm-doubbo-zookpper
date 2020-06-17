package com.geovis.ai.model;

import java.io.Serializable;
import java.util.Date;

public class Biddings implements Serializable {
    /**
     * 
     */
    private Integer id;

    /**
     * 需求id
     */
    private Integer demandId;

    /**
     * 投标用户id
     */
    private Long userId;

    /**
     * 生产周期
     */
    private String deliverCycle;

    /**
     * 交付时间
     */
    private Date deliverTime;

    /**
     *  进度状态 默认0投递中  1成功中标 2竞标失败 
     */
    private Byte schedule;

    /**
     * 我的报价
     */
    private Integer price;

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
     * 投标简介
     */
    private String introduction;

    /**
     * 投标文档
     */
    private String biddingFile;

    /**
     * 成果文档
     */
    private String deliverFile;

    /**
     * biddings
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
     * 需求id
     * @return demand_id 需求id
     */
    public Integer getDemandId() {
        return demandId;
    }

    /**
     * 需求id
     * @param demandId 需求id
     */
    public void setDemandId(Integer demandId) {
        this.demandId = demandId;
    }

    /**
     * 投标用户id
     * @return user_id 投标用户id
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * 投标用户id
     * @param userId 投标用户id
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    /**
     * 生产周期
     * @return deliver_cycle 生产周期
     */
    public String getDeliverCycle() {
        return deliverCycle;
    }

    /**
     * 生产周期
     * @param deliverCycle 生产周期
     */
    public void setDeliverCycle(String deliverCycle) {
        this.deliverCycle = deliverCycle == null ? null : deliverCycle.trim();
    }

    /**
     * 交付时间
     * @return deliver_time 交付时间
     */
    public Date getDeliverTime() {
        return deliverTime;
    }

    /**
     * 交付时间
     * @param deliverTime 交付时间
     */
    public void setDeliverTime(Date deliverTime) {
        this.deliverTime = deliverTime;
    }

    /**
     *  进度状态 默认0投递中  1成功中标 2竞标失败 
     * @return schedule  进度状态 默认0投递中  1成功中标 2竞标失败 
     */
    public Byte getSchedule() {
        return schedule;
    }

    /**
     *  进度状态 默认0投递中  1成功中标 2竞标失败 
     * @param schedule  进度状态 默认0投递中  1成功中标 2竞标失败 
     */
    public void setSchedule(Byte schedule) {
        this.schedule = schedule;
    }

    /**
     * 我的报价
     * @return price 我的报价
     */
    public Integer getPrice() {
        return price;
    }

    /**
     * 我的报价
     * @param price 我的报价
     */
    public void setPrice(Integer price) {
        this.price = price;
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

    /**
     * 投标简介
     * @return introduction 投标简介
     */
    public String getIntroduction() {
        return introduction;
    }

    /**
     * 投标简介
     * @param introduction 投标简介
     */
    public void setIntroduction(String introduction) {
        this.introduction = introduction == null ? null : introduction.trim();
    }

    /**
     * 投标文档
     * @return bidding_file 投标文档
     */
    public String getBiddingFile() {
        return biddingFile;
    }

    /**
     * 投标文档
     * @param biddingFile 投标文档
     */
    public void setBiddingFile(String biddingFile) {
        this.biddingFile = biddingFile == null ? null : biddingFile.trim();
    }

    /**
     * 成果文档
     * @return deliver_file 成果文档
     */
    public String getDeliverFile() {
        return deliverFile;
    }

    /**
     * 成果文档
     * @param deliverFile 成果文档
     */
    public void setDeliverFile(String deliverFile) {
        this.deliverFile = deliverFile == null ? null : deliverFile.trim();
    }
}