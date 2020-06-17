package com.geovis.ai.service;

import com.geovis.ai.model.Samples;
import com.geovis.ai.model.SamplesExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SamplesMapper {
    long countByExample(SamplesExample example);

    int deleteByExample(SamplesExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Samples record);

    int insertSelective(Samples record);

    List<Samples> selectByExampleWithBLOBs(SamplesExample example);

    List<Samples> selectByExample(SamplesExample example);

    Samples selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Samples record, @Param("example") SamplesExample example);

    int updateByExampleWithBLOBs(@Param("record") Samples record, @Param("example") SamplesExample example);

    int updateByExample(@Param("record") Samples record, @Param("example") SamplesExample example);

    int updateByPrimaryKeySelective(Samples record);

    int updateByPrimaryKeyWithBLOBs(Samples record);

    int updateByPrimaryKey(Samples record);
}