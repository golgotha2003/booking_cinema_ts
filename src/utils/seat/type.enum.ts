export enum SeatType {
    VIP = "vip",
    STANDARD = "standard",
    DELUXE = "deluxe",
}

export const SeatMultipler: Record<SeatType, number> = {
    [SeatType.STANDARD]: 1.0,
    [SeatType.VIP]: 1.5,
    [SeatType.DELUXE]: 2.0
}