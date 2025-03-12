import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../../../services/comments.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Comment {
  id: number
  user: string
  content: string
  createdAt: string
}

@Component({
  selector: 'app-comments',
  imports: [FormsModule, CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})

export class CommentsComponent implements OnInit {
  comments: Comment[] = []
  newComment: string = ''
  page = 1
  limit = 10

  constructor(private commentsService: CommentsService) {}

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.commentsService.getComments(this.page, this.limit).subscribe(data => {
      this.comments = [...this.comments, ...data]
      this.page++; 
    });
  }

  addComment() {
    if (!this.newComment.trim()) return

    const newComment = {
      user: 'Usuario',
      content: this.newComment,
      createdAt: new Date().toISOString()
    };

    this.commentsService.addComment(newComment).subscribe(comment => {
      this.comments.unshift(comment)
      this.newComment = ''
    });
  }
}