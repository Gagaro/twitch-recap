export interface ChatData {
    event_type: 'started_watching' | 'chat' | 'cheer',
    day: string,
    channel: string,
    context: string,
}

export interface MinutesData {
    day: string,
    channel_name: string,
    context: string,
}