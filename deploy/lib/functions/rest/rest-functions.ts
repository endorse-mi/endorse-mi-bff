import { Construct } from 'constructs';
import { Foundation } from '../../foundation';
import addPreviewPostsEndpoint from './preview-posts-function';

export class RestFunctions {
  constructor(scope: Construct, foundation: Foundation) {
    addPreviewPostsEndpoint(scope, foundation);
  }
}
