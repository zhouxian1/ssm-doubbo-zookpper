package com.geovis.ai.service;

import com.geovis.ai.model.Rotation;
import com.geovis.ai.model.RotationExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface RotationMapper {
    long countByExample(RotationExample example);

    int deleteByExample(RotationExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Rotation record);

    int insertSelective(Rotation record);

    List<Rotation> selectByExampleWithBLOBs(RotationExample example);

    List<Rotation> selectByExample(RotationExample example);

    Rotation selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Rotation record, @Param("example") RotationExample example);

    int updateByExampleWithBLOBs(@Param("record") Rotation record, @Param("example") RotationExample example);

    int updateByExample(@Param("record") Rotation record, @Param("example") RotationExample example);

    int updateByPrimaryKeySelective(Rotation record);

    int updateByPrimaryKeyWithBLOBs(Rotation record);

    int updateByPrimaryKey(Rotation record);
}