package com.geovis.ai.service;

import com.geovis.ai.model.Migrations;
import com.geovis.ai.model.MigrationsExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface MigrationsMapper {
    long countByExample(MigrationsExample example);

    int deleteByExample(MigrationsExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Migrations record);

    int insertSelective(Migrations record);

    List<Migrations> selectByExample(MigrationsExample example);

    Migrations selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Migrations record, @Param("example") MigrationsExample example);

    int updateByExample(@Param("record") Migrations record, @Param("example") MigrationsExample example);

    int updateByPrimaryKeySelective(Migrations record);

    int updateByPrimaryKey(Migrations record);
}