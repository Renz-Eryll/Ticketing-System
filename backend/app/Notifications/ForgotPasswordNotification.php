<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ForgotPasswordNotification extends Notification
{
    use Queueable;
    protected $otp, $email;

    /**
     * Create a new notification instance.
     */
    public function __construct($email, $otp)
    {
        $this->otp = $otp;
        $this->email = $email;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Password Reset OTP')
            ->greeting('Hello,')
            ->line('We received a request to reset the password for your account associated with this email: ' . $this->email . '.')
            ->line('Your One-Time Password (OTP) is: **' . $this->otp . '**')
            ->line('Please enter this OTP to proceed with resetting your password.')
            ->line('**Note:** Do not share this OTP with anyone for security reasons.')
            ->line('If you did not request a password reset, please ignore this message or contact our support team.')
            ->salutation('Thank you,')
            ->salutation(config('app.name') . ' Business Solution Inc.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
