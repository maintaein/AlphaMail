import React, { useState, useEffect, useRef } from 'react';
import { useUserInfo } from '@/shared/hooks/useUserInfo';
import { api } from '@/shared/lib/axiosInstance';
import { Typography } from '@/shared/components/atoms/Typography';
import { Button } from '@/shared/components/atoms/button';
import { Input } from '@/shared/components/atoms/input';

export const UserManageTemplate: React.FC = () => {
  const { data: userInfo } = useUserInfo();
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
    if (!currentPassword || !newPassword) {
      setMessage({ type: 'error', text: '현재 비밀번호와 새 비밀번호를 모두 입력해주세요.' });
      return;
    }
    if (newPassword.length === 0) {
      setMessage({ type: 'error', text: '새 비밀번호는 8자 이상이어야 합니다.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: '새 비밀번호가 일치하지 않습니다.' });
      return;
    }
    setIsLoading(true);
    try {
      console.log(currentPassword, newPassword);
      await api.patch(`/api/users/password`, {
        currPassword: currentPassword,
        newPassword: newPassword,
      });
      setMessage({ type: 'success', text: '비밀번호가 성공적으로 변경되었습니다.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setMessage({ type: 'error', text: error?.response?.data?.message || '비밀번호 변경에 실패했습니다.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
        alert('이미지는 .png, .jpg 파일만 업로드할 수 있습니다.');
        return;
      }
      setProfileFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfileImg(ev.target?.result as string);
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
        formDataObj.append('images', profileFile);
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
        <div className={`mb-4 p-4 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
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
        <table className="w-full border mb-8">
          <tbody>
            <tr>
              <td className="w-40 bg-gray-50 text-center align-middle font-medium">
                <Typography variant="body">현재 비밀번호<span className="text-red-500">*</span></Typography>
              </td>
              <td>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  className="w-60 h-9 px-2 border border-gray-300 rounded focus:outline-none"
                  placeholder="현재 비밀번호"
                />
              </td>
            </tr>
            <tr>
              <td className="bg-gray-50 text-center font-medium">
                <Typography variant="body">새 비밀번호<span className="text-red-500">*</span></Typography>
              </td>
              <td>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-60 h-9 px-2 border border-gray-300 rounded focus:outline-none"
                  placeholder="새 비밀번호"
                />
              </td>
            </tr>
            <tr>
              <td className="bg-gray-50 text-center font-medium">
                <Typography variant="body">새 비밀번호 확인<span className="text-red-500">*</span></Typography>
              </td>
              <td>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-60 h-9 px-2 border border-gray-300 rounded focus:outline-none"
                  placeholder="새 비밀번호 확인"
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
                    onClick={handlePasswordChange}
                    disabled={isLoading}
                  >
                    <Typography variant="body" className="text-white">
                      {isLoading ? '변경 중...' : '비밀번호 변경'}
                    </Typography>
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};
