package com.geovis.ai.service;

import com.geovis.ai.model.Classifications;
import com.geovis.ai.model.ClassificationsExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ClassificationsMapper {
    long countByExample(ClassificationsExample example);

    int deleteByExample(ClassificationsExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Classifications record);

    int insertSelective(Classifications record);

    List<Classifications> selectByExampleWithBLOBs(ClassificationsExample example);

    List<Classifications> selectByExample(ClassificationsExample example);

    Classifications selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Classifications record, @Param("example") ClassificationsExample example);

    int updateByExampleWithBLOBs(@Param("record") Classifications record, @Param("example") ClassificationsExample example);

    int updateByExample(@Param("record") Classifications record, @Param("example") ClassificationsExample example);

    int updateByPrimaryKeySelective(Classifications record);

    int updateByPrimaryKeyWithBLOBs(Classifications record);

    int updateByPrimaryKey(Classifications record);
}