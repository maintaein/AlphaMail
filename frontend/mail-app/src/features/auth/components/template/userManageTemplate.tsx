import React, { useState, useEffect, useRef } from 'react';
import { useUserInfo } from '@/shared/hooks/useUserInfo';
import { api } from '@/shared/lib/axiosInstance';
import { Typography } from '@/shared/components/atoms/Typography';
import { Button } from '@/shared/components/atoms/button';
import { Input } from '@/shared/components/atoms/input';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

export const UserManageTemplate: React.FC = () => {
  const { data: userInfo } = useUserInfo();
  const queryClient = useQueryClient(); // 추가: QueryClient 가져오기

  const [formData, setFormData] = useState({
    id: 0,
    email: '',
    name: '',
    phone: '',
    position: '',
    department: '',
    companyId: 0,
    groupId: 0,
    image: '',
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [imgLoading, setImgLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [phoneLoading, setPhoneLoading] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        phone: userInfo.phoneNum || '',
        position: userInfo.position || '',
        department: userInfo.groupName || '',
        companyId: userInfo.companyId,
        groupId: userInfo.groupId,
        image: userInfo.image || '',
      });
      setProfileImg(userInfo.image || '/profile-default.png');
    }
  }, [userInfo]);

  const handlePasswordChange = async () => {
    setMessage({ type: '', text: '' });

    // 현재 비밀번호 입력 확인
    if (!currentPassword) {
      toast.error('현재 비밀번호를 입력해주세요.');
      return;
    }

    // 새 비밀번호 입력 확인
    if (!newPassword) {
      toast.error('새 비밀번호를 입력해주세요.');
      return;
    }

    // 새 비밀번호 길이 검사 (8자 이상)
    if (newPassword.length < 8) {
      toast.error('새 비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    // 새 비밀번호 확인 일치 검사
    if (newPassword !== confirmPassword) {
      toast.error('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    try {
      await api.patch(`/api/users/password`, {
        currPassword: currentPassword,
        newPassword: newPassword,
      });

      // 성공 메시지
      toast.success('비밀번호가 성공적으로 변경되었습니다.');

      // 입력 필드 초기화
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || '비밀번호 변경에 실패했습니다.';
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 전화번호 필드인 경우 특별한 처리를 합니다
    if (name === 'phone') {
      // 입력된 값에서 모든 하이픈을 제거합니다
      const numbersOnly = value.replace(/-/g, '');

      // 숫자만 입력되도록 검사합니다
      if (!/^\d*$/.test(numbersOnly)) {
        toast.error('전화번호는 숫자만 입력할 수 있습니다.');
        return; // 숫자가 아닌 문자가 포함되어 있으면 상태를 업데이트하지 않습니다
      }

      // 숫자만 있는 문자열에 하이픈을 자동으로 추가합니다
      let formattedPhone = '';
      if (numbersOnly.length <= 3) {
        formattedPhone = numbersOnly;
      } else if (numbersOnly.length <= 7) {
        formattedPhone = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
      } else {
        formattedPhone = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
      }

      // 하이픈이 자동으로 추가된 형식으로 상태를 업데이트합니다
      setFormData(prev => ({
        ...prev,
        [name]: formattedPhone,
      }));
    } else {
      // 다른 필드는 원래대로 처리합니다
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleProfileImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 확장자 검사
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
        toast.error('이미지는 .png, .jpg, .jpeg 파일만 업로드할 수 있습니다.'); // alert -> toast.error
        return;
      }

      // 파일 크기 제한 (예: 2MB)
      const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSizeInBytes) {
        toast.error('이미지는 2MB 이하만 업로드할 수 있습니다.'); // alert -> toast.error
        return;
      }

      // MIME 타입 검사 (실제 파일 타입 확인)
      if (!file.type.startsWith('image/')) {
        toast.error('유효한 이미지 파일이 아닙니다.'); // alert -> toast.error
        return;
      }

      // 추가적인 보안 검사: 파일의 실제 내용 확인
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          // 이미지 객체 생성을 통한 추가 검증
          const img = new Image();
          img.onload = () => {
            // 유효한 이미지인 경우에만 상태 업데이트
            setProfileFile(file);
            setProfileImg(ev.target?.result as string);
          };
          img.onerror = () => {
            toast.error('손상되었거나 유효하지 않은 이미지 파일입니다.'); // alert -> toast.error
          };
          img.src = ev.target?.result as string;
        } catch (error) {
          toast.error('이미지 파일을 읽는 중 오류가 발생했습니다.'); // alert -> toast.error
        }
      };
      reader.readAsDataURL(file);
    }
  };


  const handleProfileAndPhoneUpdate = async () => {
    setPhoneLoading(true);
    setImgLoading(true);
    setMessage({ type: '', text: '' });
    let profileImgUrl = userInfo?.image || '';
    try {
      if (profileFile) {
        const formDataObj = new FormData();
        formDataObj.append('image', profileFile);
        // TODO: S3 업로드 전 기존 이미지 삭제
        const res = await api.post('/api/s3/images', formDataObj, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        profileImgUrl = res.data?.s3Key || profileImgUrl;
      }
      await api.patch('/api/users/me', {
        phoneNum: formData.phone,
        image: profileImgUrl,
      });

      queryClient.invalidateQueries({ queryKey: ['userInfo'] });


      setMessage({ type: 'success', text: '프로필 사진과 전화번호가 성공적으로 수정되었습니다.' });
      setProfileFile(null);
    } catch (error: any) {
      setMessage({ type: 'error', text: error?.response?.data?.message || '수정에 실패했습니다.' });
    } finally {
      setPhoneLoading(false);
      setImgLoading(false);
    }
  };

  if (!userInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <Typography variant="titleMedium" >기본 정보</Typography>
      </div>
      {message.text && (
        <div className={`mb-4 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
          <Typography variant="body">{message.text}</Typography>
        </div>
      )}
      <form className="max-w-2xl">
        <table className="w-full border mb-8">
          <tbody>
            <tr>
              <td className="w-40 bg-gray-50 text-center align-middle font-medium">
                <Typography variant="body">프로필 사진</Typography>
              </td>
              <td>
                <div className="flex items-center gap-4">
                  <div
                    className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer border border-gray-300"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {profileImg ? (
                      <img
                        src={profileImg}
                        alt="프로필"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-medium text-gray-700">
                        {formData.name.charAt(0) || '?'}
                      </span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleProfileImgChange}
                  />
                  <Button
                    type="button"
                    size="small"
                    variant="secondary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Typography variant="body">사진 변경</Typography>
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="w-40 bg-gray-50 text-center align-middle font-medium">
                <Typography variant="body">이름</Typography>
              </td>
              <td>
                <Typography variant="body" className="bg-gray-100 rounded px-3 py-2 inline-block w-60">{formData.name}</Typography>
              </td>
            </tr>
            <tr>
              <td className="bg-gray-50 text-center font-medium">
                <Typography variant="body">이메일주소</Typography>
              </td>
              <td>
                <Typography variant="body" className="bg-gray-100 rounded px-3 py-2 inline-block w-60">{formData.email}</Typography>
              </td>
            </tr>
            <tr>
              <td className="bg-gray-50 text-center font-medium">
                <Typography variant="body">핸드폰 번호</Typography>
              </td>
              <td>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-60 h-9 px-2 border border-gray-300 rounded focus:outline-none"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="bg-gray-50"></td>
              <td>
                <div className="flex justify-end mt-2">
                  <Button
                    type="button"
                    size="small"
                    variant="primary"
                    onClick={handleProfileAndPhoneUpdate}
                    disabled={phoneLoading || imgLoading}
                  >
                    <Typography variant="body" className="text-white">
                      {(phoneLoading || imgLoading) ? '저장 중...' : '수정'}
                    </Typography>
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <Typography variant="titleMedium" className="mb-2">비밀번호 변경</Typography>
        <div className="w-full border rounded-lg overflow-hidden mb-8 shadow-sm">
          <div className="p-6 bg-white">
            <div className="flex flex-col space-y-4">
              {/* 현재 비밀번호 */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  현재 비밀번호 <span className="text-red-500">*</span>
                </label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="현재 비밀번호 입력"
                />
              </div>

              {/* 새 비밀번호 */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  새 비밀번호 <span className="text-red-500">*</span>
                </label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="새 비밀번호 입력"
                />
                <div className="mt-1 flex items-center">
                  <div className={`w-2 h-2 rounded-full ${newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="ml-2 text-xs text-gray-500">8자 이상</span>
                </div>
              </div>

              {/* 새 비밀번호 확인 */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  새 비밀번호 확인 <span className="text-red-500">*</span>
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="새 비밀번호 다시 입력"
                />
                {newPassword && confirmPassword && (
                  <div className="mt-1 flex items-center">
                    <div className={`w-2 h-2 rounded-full ${newPassword === confirmPassword ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={`ml-2 text-xs ${newPassword === confirmPassword ? 'text-green-500' : 'text-red-500'}`}>
                      {newPassword === confirmPassword ? '비밀번호 일치' : '비밀번호 불일치'}
                    </span>
                  </div>
                )}
              </div>

              {/* 버튼 영역 */}
              <div className="flex justify-end pt-2">
                <Button
                  type="button"
                  size="medium"
                  variant="primary"
                  onClick={handlePasswordChange}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-md"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      <span>변경 중...</span>
                    </div>
                  ) : (
                    '비밀번호 변경'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};