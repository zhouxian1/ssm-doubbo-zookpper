package com.geovis.ai.model;

import java.io.Serializable;

public class Migrations implements Serializable {
    /**
     * 
     */
    private Integer id;

    /**
     * 
     */
    private String migration;

    /**
     * 
     */
    private Integer batch;

    /**
     * migrations
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
     * 
     * @return migration 
     */
    public String getMigration() {
        return migration;
    }

    /**
     * 
     * @param migration 
     */
    public void setMigration(String migration) {
        this.migration = migration == null ? null : migration.trim();
    }

    /**
     * 
     * @return batch 
     */
    public Integer getBatch() {
        return batch;
    }

    /**
     * 
     * @param batch 
     */
    public void setBatch(Integer batch) {
        this.batch = batch;
    }
}