import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { homeService } from '../services/homeService';
import { homeQueryKeys } from '../constants/queryKeys';
import { AssistantsParams } from '../types/home';
import { toast } from 'react-toastify';

export const useHome = () => {
  const queryClient = useQueryClient();
  
  // AI 비서 항목 목록 조회 쿼리
  const useAssistants = (params: AssistantsParams = {}) => {
    return useQuery({
      queryKey: [...homeQueryKeys.assistants, params],
      queryFn: () => homeService.getAssistants(params),
      staleTime: 1000 * 60 * 5, // 5분
    });
  };
  
  // AI 비서 항목 삭제 뮤테이션
  const useDeleteAssistant = () => {
    return useMutation({
      mutationFn: (id: number) => homeService.deleteAssistant(id),
      onSuccess: () => {
        // 삭제 성공 시 목록 쿼리 무효화
        queryClient.invalidateQueries({ queryKey: homeQueryKeys.assistants });
        toast.success('항목이 삭제되었습니다.');
      },
      onError: () => {
        toast.error('항목 삭제에 실패했습니다.');
      }
    });
  };
  
  return {
    useAssistants,
    useDeleteAssistant
  };
};