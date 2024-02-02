'use client'
import { useCallback, useState } from "react";

export default function useTimedAlert(
    delay = 5000
): [AlterInfoType, (alertInfo: AlterInfoType) => void] {

    const [alertInfo, setAlertInfo] = useState<AlterInfoType>();

    const internalSetAlertInfo = 
        useCallback((alertInfo: AlterInfoType) => {
                setAlertInfo(alertInfo)
                setTimeout(() => setAlertInfo(undefined), delay)
            },
        [setAlertInfo, delay])

    return [alertInfo, internalSetAlertInfo] as const
}

export type AlterInfoType = {
    severity: "error" | "info" | "success" | "warning" | undefined,
    message: string,
} | undefined