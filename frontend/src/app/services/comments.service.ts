import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Comment {
  id: number;
  user: string;
  content: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private apiUrl = 'https://localhost:8080/'

  constructor(private http: HttpClient) {}

  getComments(page: number, limit: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}?_page=${page}&_limit=${limit}`);
  }

  addComment(comment: Omit<Comment, 'id'>): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, comment);
  }
}