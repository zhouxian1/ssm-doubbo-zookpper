package com.geovis.ai.service;

import com.geovis.ai.model.Documents;
import com.geovis.ai.model.DocumentsExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface DocumentsMapper {
    long countByExample(DocumentsExample example);

    int deleteByExample(DocumentsExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Documents record);

    int insertSelective(Documents record);

    List<Documents> selectByExampleWithBLOBs(DocumentsExample example);

    List<Documents> selectByExample(DocumentsExample example);

    Documents selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Documents record, @Param("example") DocumentsExample example);

    int updateByExampleWithBLOBs(@Param("record") Documents record, @Param("example") DocumentsExample example);

    int updateByExample(@Param("record") Documents record, @Param("example") DocumentsExample example);

    int updateByPrimaryKeySelective(Documents record);

    int updateByPrimaryKeyWithBLOBs(Documents record);

    int updateByPrimaryKey(Documents record);
}