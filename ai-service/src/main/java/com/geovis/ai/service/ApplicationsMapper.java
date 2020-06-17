package com.geovis.ai.service;

import com.geovis.ai.model.Applications;
import com.geovis.ai.model.ApplicationsExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ApplicationsMapper {
    long countByExample(ApplicationsExample example);

    int deleteByExample(ApplicationsExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Applications record);

    int insertSelective(Applications record);

    List<Applications> selectByExampleWithBLOBs(ApplicationsExample example);

    List<Applications> selectByExample(ApplicationsExample example);

    Applications selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Applications record, @Param("example") ApplicationsExample example);

    int updateByExampleWithBLOBs(@Param("record") Applications record, @Param("example") ApplicationsExample example);

    int updateByExample(@Param("record") Applications record, @Param("example") ApplicationsExample example);

    int updateByPrimaryKeySelective(Applications record);

    int updateByPrimaryKeyWithBLOBs(Applications record);

    int updateByPrimaryKey(Applications record);
}