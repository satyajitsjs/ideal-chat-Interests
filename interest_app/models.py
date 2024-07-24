from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Interest(models.Model):
    ACCEPTED_CHOICES = [
        (True, 'Accepted'),
        (False, 'Not Accepted'),
    ]

    sender = models.ForeignKey(User, related_name='sent_interests', on_delete=models.CASCADE)
    recipient = models.ForeignKey(User, related_name='received_interests', on_delete=models.CASCADE)
    message = models.TextField()
    accepted = models.BooleanField(default=False, choices=ACCEPTED_CHOICES, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Interest from {self.sender} to {self.recipient}"

    class Meta:
        unique_together = ('sender', 'recipient')
        ordering = ['-created_at']

class ChatMessage(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    recipient = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"From {self.sender.username} to {self.recipient.username}: {self.message[:50]}"

    class Meta:
        ordering = ['-created_at']