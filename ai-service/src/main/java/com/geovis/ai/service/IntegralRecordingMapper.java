package com.geovis.ai.service;

import com.geovis.ai.model.IntegralRecording;
import com.geovis.ai.model.IntegralRecordingExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface IntegralRecordingMapper {
    long countByExample(IntegralRecordingExample example);

    int deleteByExample(IntegralRecordingExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(IntegralRecording record);

    int insertSelective(IntegralRecording record);

    List<IntegralRecording> selectByExample(IntegralRecordingExample example);

    IntegralRecording selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") IntegralRecording record, @Param("example") IntegralRecordingExample example);

    int updateByExample(@Param("record") IntegralRecording record, @Param("example") IntegralRecordingExample example);

    int updateByPrimaryKeySelective(IntegralRecording record);

    int updateByPrimaryKey(IntegralRecording record);
}