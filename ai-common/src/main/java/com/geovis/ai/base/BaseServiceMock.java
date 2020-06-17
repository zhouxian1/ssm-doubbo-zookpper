package com.geovis.ai.base;

import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 降级实现BaseService抽象类
 */
public abstract class BaseServiceMock<Record, Example> implements BaseService<Record, Example> {

	@Override
	public int countByExample(Example example) {
		//throw new RuntimeException("countByExample fail!");
		return -1;
	}

	@Override
	public int deleteByExample(Example example) {
		return -1;
	}

	@Override
	public int deleteByPrimaryKey(Long id) {
		return -1;
	}

	@Override
	public int insert(Record record) {
		return -1;
	}

	@Override
	public int insertSelective(Record record) {
		return -1;
	}

	@Override
	public List<Record> selectByExampleWithBLOBs(Example example) {
		return null;
	}

	@Override
	public List<Record> selectByExample(Example example) {
		return null;
	}

	@Override
	public Record selectFirstByExample(Example example) {
		return null;
	}

	@Override
	public Record selectFirstByExampleWithBLOBs(Example example) {
		return null;
	}

	@Override
	public Record selectByPrimaryKey(Long id) {
		return null;
	}

	@Override
	public int updateByExampleSelective(@Param("record") Record record, @Param("example") Example example) {
		return -1;
	}

	@Override
	public int updateByExampleWithBLOBs(@Param("record") Record record, @Param("example") Example example) {
		return -1;
	}

	@Override
	public int updateByExample(@Param("record") Record record, @Param("example") Example example) {
		return -1;
	}

	@Override
	public int updateByPrimaryKeySelective(Record record) {
		return -1;
	}

	@Override
	public int updateByPrimaryKeyWithBLOBs(Record record) {
		return -1;
	}

	@Override
	public int updateByPrimaryKey(Record record) {
		return -1;
	}

	@Override
	public int deleteByPrimaryKeys(String ids) {
		return -1;
	}

	@Override
	public void initMapper() {}

}