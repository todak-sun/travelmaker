package com.travelmaker.alarm.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.travelmaker.alarm.domain.AlarmDTO;
import com.travelmaker.user.domain.UserDTO;

@Transactional
@Repository
public class AlarmDAOImpl implements AlarmDAO {

	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public void addAlarm(AlarmDTO alarmDTO) {
		sqlSession.insert("alarmSQL.addAlarm", alarmDTO);
	}

	@Override
	public List<AlarmDTO> getAlarmList(String seq) {
		UserDTO userDTO = sqlSession.selectOne("userSQL.getUserDTO", Integer.parseInt(seq));
		String requestFid = userDTO.getId()+"%"+userDTO.getRegisterMethod();
		return sqlSession.selectList("alarmSQL.getAlarmList",requestFid);
	}

	@Override
	public int alarmChange(int ano) {
		sqlSession.update("alarmSQL.alarmIsReadChange", ano);
		return sqlSession.selectOne("alarmSQL.getAlarmDataSeq", ano);
	}

	@Override
	public void alarmDelete(String dataseq) {
		sqlSession.delete("alarmSQL.alarmDelete",Integer.parseInt(dataseq));
	}
	
	

}
