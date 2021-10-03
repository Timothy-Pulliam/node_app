#!/usr/bin/env python
# -*- coding: utf-8 -*-

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

YOUTUBE_API_KEY = 'AIzaSyDmd33DSeo3r3lSAEudz6oSGc3dsYqziOA'


def get_comment_threads(videoId):
    """Returns top level comments"""
    with build('youtube', 'v3', developerKey=YOUTUBE_API_KEY) as service:
        request = service.comments().list(part='snippet,replies', videoId=videoId)
        try:
            response = request.execute()
        except HttpError as e:
            print('Error response status code : {0}, reason : {1}'.format(e.status_code, e.error_details))
            return {}
        return response


def get_comment():
    """Returns lower level comments/replies to top level comments"""
    pass

if __name__ == '__main__':
    get_comment_threads('-JMYaBZIesI')
