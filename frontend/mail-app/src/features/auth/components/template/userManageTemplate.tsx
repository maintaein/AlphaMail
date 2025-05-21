import React, { useState, useEffect, useRef } from 'react';
import { useUserInfo } from '@/shared/hooks/useUserInfo';
import { api } from '@/shared/lib/axiosInstance';
import { Typography } from '@/shared/components/atoms/Typography';
import { Button } from '@/shared/components/atoms/button';
import { Input } from '@/shared/components/atoms/input';
import { showToast } from '@/shared/components/atoms/toast';
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
      showToast('현재 비밀번호를 입력해주세요.', 'error');
      return;
    }

    // 새 비밀번호 입력 확인
    if (!newPassword) {
      showToast('새 비밀번호를 입력해주세요.', 'error');
      return;
    }

    // 새 비밀번호 길이 검사 (8자 이상)
    if (newPassword.length < 8) {
      showToast('새 비밀번호는 8자 이상이어야 합니다.', 'error');
      return;
    }

    // 새 비밀번호 확인 일치 검사
    if (newPassword !== confirmPassword) {
      showToast('새 비밀번호가 일치하지 않습니다.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await api.patch(`/api/users/password`, {
        currPassword: currentPassword,
        newPassword: newPassword,
      });

      // 성공 메시지
      showToast('비밀번호가 성공적으로 변경되었습니다.', 'success');

      // 입력 필드 초기화
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || '비밀번호 변경에 실패했습니다.';
      showToast(errorMsg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const numbersOnly = value.replace(/\D/g, '');

    if (numbersOnly.startsWith('02')) {
      // 서울 지역번호
      if (numbersOnly.length <= 2) return numbersOnly;
      if (numbersOnly.length <= 5) return `${numbersOnly.slice(0, 2)}-${numbersOnly.slice(2)}`;
      if (numbersOnly.length <= 9)
        return `${numbersOnly.slice(0, 2)}-${numbersOnly.slice(2, 5)}-${numbersOnly.slice(5)}`;
      return `${numbersOnly.slice(0, 2)}-${numbersOnly.slice(2, 6)}-${numbersOnly.slice(6, 10)}`;
    } else {
      // 휴대폰 또는 일반 지역번호 (3자리)
      if (numbersOnly.length <= 3) return numbersOnly;
      if (numbersOnly.length <= 6)
        return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
      if (numbersOnly.length <= 10)
        return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 6)}-${numbersOnly.slice(6)}`;
      return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
    }
  };

  const isValidPhoneNumber = (value: string) => {
    const phoneRegex = /^(010-\d{4}-\d{4}|01[16789]-\d{3,4}-\d{4}|02-\d{3,4}-\d{4}|(031|032|033|041|042|043|044|051|052|053|054|055|061|062|063|064)-\d{3,4}-\d{4})$/;
    return phoneRegex.test(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 전화번호 필드인 경우 특별한 처리를 합니다
    if (name === 'phone') {
      // 입력된 값에서 모든 하이픈을 제거합니다
      const formatted = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, phone: formatted }));
      return;
    }
  };

  const handleProfileImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 확장자 검사
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
        showToast('이미지는 .png, .jpg, .jpeg 파일만 업로드할 수 있습니다.', 'error'); // alert -> toast.error
        return;
      }

      // 파일 크기 제한 (예: 2MB)
      const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSizeInBytes) {
        showToast('이미지는 2MB 이하만 업로드할 수 있습니다.', 'error'); // alert -> toast.error
        return;
      }

      // MIME 타입 검사 (실제 파일 타입 확인)
      if (!file.type.startsWith('image/')) {
        showToast('유효한 이미지 파일이 아닙니다.', 'error'); // alert -> toast.error
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
            showToast('손상되었거나 유효하지 않은 이미지 파일입니다.', 'error'); // alert -> toast.error
          };
          img.src = ev.target?.result as string;
        } catch {
          showToast('이미지 파일을 읽는 중 오류가 발생했습니다.', 'error'); // alert -> toast.error
        }
      };
      reader.readAsDataURL(file);
    }
  };


  const handleProfileAndPhoneUpdate = async () => {
    if (!formData.phone) {
      showToast('전화번호를 입력해주세요.', 'error');
      return;
    }
    if (formData.phone && !isValidPhoneNumber(formData.phone)) {
      return;
    }
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


      showToast('프로필이 성공적으로 수정되었습니다.', 'success');
      // setMessage({ type: 'success', text: '프로필 사진과 전화번호가 성공적으로 수정되었습니다.' });
      setProfileFile(null);
    } catch  {
      showToast('프로필 수정에 실패했습니다.', 'error');
      // setMessage({ type: 'error', text: error?.response?.data?.message || '수정에 실패했습니다.' });
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
                <Typography variant="body">전화번호</Typography>
              </td>
              <td>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={13}
                  inputMode='numeric'
                  placeholder="전화번호를 입력해주세요"
                  className="w-60 h-9 px-2 border border-gray-300 rounded focus:outline-none"
                  required
                />
                {formData.phone && !isValidPhoneNumber(formData.phone) && (
                  <div className="mt-1 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="ml-2 text-xs text-red-500">전화번호 형식이 올바르지 않습니다.</span>
                  </div>
                )}
                {formData.phone && isValidPhoneNumber(formData.phone) && (
                  <div className="mt-1 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-xs text-green-500">올바른 전화번호 형식입니다.</span>
                  </div>
                )} 
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
                  size="small"
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