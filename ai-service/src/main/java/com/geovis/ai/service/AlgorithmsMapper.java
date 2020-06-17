package com.geovis.ai.service;

import com.geovis.ai.model.Algorithms;
import com.geovis.ai.model.AlgorithmsExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface AlgorithmsMapper {
    long countByExample(AlgorithmsExample example);

    int deleteByExample(AlgorithmsExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Algorithms record);

    int insertSelective(Algorithms record);

    List<Algorithms> selectByExampleWithBLOBs(AlgorithmsExample example);

    List<Algorithms> selectByExample(AlgorithmsExample example);

    Algorithms selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Algorithms record, @Param("example") AlgorithmsExample example);

    int updateByExampleWithBLOBs(@Param("record") Algorithms record, @Param("example") AlgorithmsExample example);

    int updateByExample(@Param("record") Algorithms record, @Param("example") AlgorithmsExample example);

    int updateByPrimaryKeySelective(Algorithms record);

    int updateByPrimaryKeyWithBLOBs(Algorithms record);

    int updateByPrimaryKey(Algorithms record);
}