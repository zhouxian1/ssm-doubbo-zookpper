package com.geovis.ai.service;

import com.geovis.ai.model.Knowledges;
import com.geovis.ai.model.KnowledgesExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface KnowledgesMapper {
    long countByExample(KnowledgesExample example);

    int deleteByExample(KnowledgesExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Knowledges record);

    int insertSelective(Knowledges record);

    List<Knowledges> selectByExampleWithBLOBs(KnowledgesExample example);

    List<Knowledges> selectByExample(KnowledgesExample example);

    Knowledges selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Knowledges record, @Param("example") KnowledgesExample example);

    int updateByExampleWithBLOBs(@Param("record") Knowledges record, @Param("example") KnowledgesExample example);

    int updateByExample(@Param("record") Knowledges record, @Param("example") KnowledgesExample example);

    int updateByPrimaryKeySelective(Knowledges record);

    int updateByPrimaryKeyWithBLOBs(Knowledges record);

    int updateByPrimaryKey(Knowledges record);
}