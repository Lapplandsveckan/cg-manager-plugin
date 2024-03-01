import {EventEmitter} from 'events';

export interface MediaDoc {
    id: string;
    _invalidate?: boolean;

    mediaPath?: string;
    mediaSize?: number;
    mediaTime?: number;

    thumbSize?: number;
    thumbTime?: number;

    cinf?: string;
    tinf?: string;

    mediainfo?: {
        name: string;
        path: string;
        size: number;
        time: number;
        field_order: string;

        streams: {
            codec: {
                long_name: string;
                type: string;
                time_base: string;
                tag_string: string;
                is_avc: any;
            },

            // Video
            width: number;
            height: number;
            sample_aspect_ratio: string;
            display_aspect_ratio: string;
            pix_fmt: string;
            bits_per_raw_sample: string;

            // Audio
            sample_fmt: string;
            sample_rate: number;
            channels: number;
            channel_layout: string;
            bits_per_sample: number;

            // Common
            time_base: string;
            start_time: number;
            duration_ts: string;
            duration: string;

            bit_rate: string;
            max_bit_rate: string;
            nb_frames: string;
        }[];

        format: {
            name: string;
            long_name: string;
            size: string;

            start_time: number;
            duration: number;
            bit_rate: number;
            max_bit_rate: number;
        },
    };

    _attachments?: {
        'thumb.png': {
            content_type: string;
            data: Buffer;
        }
    }
}

export declare class FileDatabase extends EventEmitter {
    // This is a static method, so it will not be available from the plugin
    // public static get db(): FileDatabase;

    get(id: string): MediaDoc;
    retrieve(hash: string): MediaDoc;
    getHash(id: string): string;
    put(hash: string, doc: MediaDoc): MediaDoc;
    remove(id: string): MediaDoc;
    allDocs(): MediaDoc[];

    close(): void;

    save(): string;
    load(data: string): void;
}