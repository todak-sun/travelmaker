package com.travelmaker.comment.ifs;

import com.travelmaker.model.network.Header;

import java.util.List;

public interface CommentApiInterface<Request, Response> {

    public Header<List<Response>> readAll(int bno);

    public Header<Response> create(int bno, Header<Request> request);

    public Header<Response> create(int bno, int cno, Header<Request> request);

    public Header<Response> update(Header<Request> request);

    public Header delete(int cno);

}
