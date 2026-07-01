"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

function DialogOverlay({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-[rgba(20,12,8,0.42)] backdrop-blur-[10px] backdrop-saturate-150",
        "data-[state=open]:animate-[dialog-overlay-in_180ms_ease-out_both]",
        "data-[state=closed]:animate-[dialog-overlay-out_160ms_ease-in_both]",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-50 inset-x-0 bottom-0",
          "sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:inset-x-auto sm:bottom-auto",
          "[&[data-state=open]>div]:animate-[dialog-content-in_260ms_ease-out_both]",
          "[&[data-state=closed]>div]:animate-[dialog-content-out_160ms_ease-in_both]",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "w-full sm:max-w-lg bg-white dark:bg-slate-800 dark:text-slate-100 rounded-t-3xl sm:rounded-3xl overflow-hidden",
            "max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)]",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),_0_1px_2px_rgba(15,23,42,0.04),_0_12px_32px_-12px_rgba(15,23,42,0.18),_0_40px_80px_-28px_rgba(202,95,21,0.22)]"
          )}
        >
          {children}
        </div>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-start justify-between px-5 sm:px-7 pt-5 sm:pt-6",
        className
      )}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 px-5 sm:px-7 py-4 mt-3 border-t border-gray-100 dark:border-slate-700 bg-gradient-to-b from-white dark:from-slate-800 to-brand-surface/40",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn(
        "inline-flex items-center gap-2",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm text-gray-500 dark:text-slate-400", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
