package com.travelmaker.alarm.service;

import com.travelmaker.alarm.dao.AlarmDAO;
import com.travelmaker.alarm.domain.AlarmDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlarmServiceImpl implements AlarmService {

    @Autowired
    private AlarmDAO alarmDAO;

    @Override
    public void addAlarm(AlarmDTO alarmDTO) {
        alarmDAO.addAlarm(alarmDTO);
    }

    @Override
    public List<AlarmDTO> getAlarmList(String seq) {
        return alarmDAO.getAlarmList(seq);
    }

    @Override
    public int alarmChange(int ano) {
        return alarmDAO.alarmChange(ano);
    }

    @Override
    public void alarmDelete(String dataseq) {
        alarmDAO.alarmDelete(dataseq);
    }

    @Override
    public List<AlarmDTO> getMyAlarmList(String userSeq, String con) {
        return alarmDAO.getMyAlarmList(userSeq, con);
    }

    @Override
    public void deleteNreadAlarm(String requestFid, int con, int alarmType) {
        alarmDAO.deleteNreadAlarm(requestFid, con, alarmType);
    }

    @Override
    public ResponseEntity<String> delete(int ano) {
        int result = alarmDAO.delete(ano);
        if (result == 1) {
            return new ResponseEntity<>("OK", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("FAIL", HttpStatus.NOT_FOUND);
        }
    }


}
