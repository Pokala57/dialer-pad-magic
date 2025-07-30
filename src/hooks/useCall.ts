import { useState, useCallback } from 'react';
import { apiService, CallData, CallResponse } from '@/services/api';
import { toast } from 'sonner';

export const useCall = () => {
  const [callData, setCallData] = useState<CallData>({
    phoneNumber: '',
    countryCode: '+91',
    status: 'idle'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [currentCallId, setCurrentCallId] = useState<string | null>(null);

  const startCall = useCallback(async (phoneNumber: string, countryCode: string) => {
    if (!phoneNumber.trim()) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    setCallData(prev => ({ ...prev, status: 'calling' }));

    try {
      const response: CallResponse = await apiService.startCall(phoneNumber, countryCode);
      
      if (response.success) {
        setCurrentCallId(response.callId || null);
        setCallData({
          phoneNumber,
          countryCode,
          status: 'connected'
        });
        toast.success('Call connected successfully!');
      } else {
        setCallData(prev => ({ ...prev, status: 'idle' }));
        toast.error(response.message || 'Failed to start call');
      }
    } catch (error) {
      setCallData(prev => ({ ...prev, status: 'idle' }));
      toast.error('Network error. Please try again.');
      console.error('Call error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const endCall = useCallback(async () => {
    if (!currentCallId) return;

    setIsLoading(true);

    try {
      const response: CallResponse = await apiService.endCall(currentCallId);
      
      if (response.success) {
        setCallData(prev => ({ ...prev, status: 'ended' }));
        setCurrentCallId(null);
        toast.success('Call ended successfully');
        
        // Reset to idle after 2 seconds
        setTimeout(() => {
          setCallData(prev => ({ ...prev, status: 'idle' }));
        }, 2000);
      } else {
        toast.error(response.message || 'Failed to end call');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
      console.error('End call error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentCallId]);

  const resetCall = useCallback(() => {
    setCallData({
      phoneNumber: '',
      countryCode: '+91',
      status: 'idle'
    });
    setCurrentCallId(null);
    setIsLoading(false);
  }, []);

  return {
    callData,
    isLoading,
    currentCallId,
    startCall,
    endCall,
    resetCall
  };
};