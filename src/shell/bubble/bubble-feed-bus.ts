import { reactive } from 'vue';

export interface BubbleFeedChip {
    label: string;
    tone: 'world-info' | 'world-info-constant' | 'neutral';
}

export interface BubbleFeedItem {
    id: string;
    title: string;
    message?: string;
    chips?: BubbleFeedChip[];
    panelTabId?: string;
    level: 'info' | 'warn' | 'error';
    source: 'world-info' | 'world-info-constant' | 'frontend-log' | 'backend-log' | 'system';
    timestampMs: number;
    repeatCount: number;
    meta?: Record<string, unknown>;
}

export interface BubbleFeedBus {
    state: {
        queue: BubbleFeedItem[];
        unreadCount: number;
    };
    push(item: Omit<BubbleFeedItem, 'id' | 'timestampMs' | 'repeatCount'>): void;
    remove(id: string): void;
    markAllRead(): void;
}

export function createBubbleFeedBus(): BubbleFeedBus {
    const state = reactive({
        queue: [] as BubbleFeedItem[],
        unreadCount: 0,
    });
    let nextId = 0;
    const removalTimers = new Map<string, ReturnType<typeof setTimeout>>();

    const scheduleRemoval = (id: string) => {
        const existing = removalTimers.get(id);
        if (existing !== undefined) {
            clearTimeout(existing);
        }

        const timer = setTimeout(() => remove(id), 3000);
        removalTimers.set(id, timer);
    };

    const remove = (id: string) => {
        const timer = removalTimers.get(id);
        if (timer !== undefined) {
            clearTimeout(timer);
            removalTimers.delete(id);
        }

        const index = state.queue.findIndex((item) => item.id === id);
        if (index !== -1) {
            state.queue.splice(index, 1);
        }
    };

    const sameChips = (left?: BubbleFeedChip[], right?: BubbleFeedChip[]) => {
        if (left === right) {
            return true;
        }

        if (!left || !right || left.length !== right.length) {
            return false;
        }

        return left.every((chip, index) => {
            const other = right[index];
            return chip.label === other.label && chip.tone === other.tone;
        });
    };

    const findDuplicateIndex = (item: Omit<BubbleFeedItem, 'id' | 'timestampMs' | 'repeatCount'>) => {
        for (let index = state.queue.length - 1; index >= 0; index -= 1) {
            const candidate = state.queue[index];
            if (
                candidate.source === item.source
                && candidate.level === item.level
                && candidate.title === item.title
                && candidate.message === item.message
                && candidate.panelTabId === item.panelTabId
                && sameChips(candidate.chips, item.chips)
            ) {
                return index;
            }
        }

        return -1;
    };

    return {
        state,
        push(item) {
            const duplicateIndex = findDuplicateIndex(item);
            if (duplicateIndex !== -1) {
                const [duplicate] = state.queue.splice(duplicateIndex, 1);
                duplicate.repeatCount += 1;
                duplicate.timestampMs = Date.now();
                state.queue.push(duplicate);
                state.unreadCount += 1;
                scheduleRemoval(duplicate.id);
                return;
            }

            const fullItem: BubbleFeedItem = {
                ...item,
                id: `feed_${Date.now()}_${nextId}`,
                timestampMs: Date.now(),
                repeatCount: 1,
            };
            nextId += 1;
            state.queue.push(fullItem);
            state.unreadCount += 1;
            scheduleRemoval(fullItem.id);
        },
        remove,
        markAllRead() {
            state.unreadCount = 0;
        },
    };
}
