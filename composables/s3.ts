import {
  S3Client,
  HeadObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export function useS3() {
  const config = useRuntimeConfig();
  const { t } = useI18n();
  const s3StatusMessage = ref<string>("");

  if (!config.public.awsRegion || !config.public.cognitoIdentityPoolId) {
    console.error("AWS region or Cognito identity pool ID is not set");
    return;
  }

  const s3 = new S3Client({
    region: config.public.awsRegion,
    credentials: fromCognitoIdentityPool({
      clientConfig: { region: config.public.awsRegion },
      identityPoolId: config.public.cognitoIdentityPoolId,
    }),
  });

  const checkFileExists = async (
    s3Key: string,
    bucketName: string
  ): Promise<boolean> => {
    s3StatusMessage.value = t("s3.checking_file");
    const headCommand = new HeadObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
    });

    try {
      const headResponse = await s3.send(headCommand);
      s3StatusMessage.value = t("s3.file_found");
      return headResponse.ContentLength !== undefined;
    } catch (headErr: any) {
      if (headErr.name === "NotFound") {
        s3StatusMessage.value = t("s3.file_not_found");
        return false;
      }
      throw headErr;
    }
  };

  const uploadFileToS3 = async (
    file: File,
    s3Key: string,
    bucketName: string
  ): Promise<void> => {
    s3StatusMessage.value = t("s3.uploading");
    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
      Body: file,
      ContentType: file.type,
    });

    const uploadResponse = await s3.send(putCommand);
    if (!uploadResponse) {
      throw new Error(t("s3.upload_error"));
    }
    s3StatusMessage.value = t("s3.upload_success");
  };

  const checkAndUploadToS3 = async (
    file: File,
    s3Key: string,
    bucketName: string
  ): Promise<boolean> => {
    const fileExists = await checkFileExists(s3Key, bucketName);

    if (!fileExists) {
      await uploadFileToS3(file, s3Key, bucketName);
    }

    return true;
  };

  return {
    s3StatusMessage,
    checkFileExists,
    uploadFileToS3,
    checkAndUploadToS3,
  };
}
