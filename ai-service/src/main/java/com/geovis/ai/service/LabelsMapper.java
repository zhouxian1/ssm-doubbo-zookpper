package com.geovis.ai.service;

import com.geovis.ai.model.Labels;
import com.geovis.ai.model.LabelsExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface LabelsMapper {
    long countByExample(LabelsExample example);

    int deleteByExample(LabelsExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Labels record);

    int insertSelective(Labels record);

    List<Labels> selectByExampleWithBLOBs(LabelsExample example);

    List<Labels> selectByExample(LabelsExample example);

    Labels selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Labels record, @Param("example") LabelsExample example);

    int updateByExampleWithBLOBs(@Param("record") Labels record, @Param("example") LabelsExample example);

    int updateByExample(@Param("record") Labels record, @Param("example") LabelsExample example);

    int updateByPrimaryKeySelective(Labels record);

    int updateByPrimaryKeyWithBLOBs(Labels record);

    int updateByPrimaryKey(Labels record);
}