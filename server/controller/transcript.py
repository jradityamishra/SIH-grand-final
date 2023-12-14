import sys
from youtube_transcript_api import YouTubeTranscriptApi


def get_transcript(video_id):

    transcript = YouTubeTranscriptApi.get_transcript(video_id)
    output = ' '.join([f"{x['text']}\n" for x in transcript])

    print(output)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python transcript.py <video_id>")
    else:
        video_id = sys.argv[1]
        get_transcript(video_id)
