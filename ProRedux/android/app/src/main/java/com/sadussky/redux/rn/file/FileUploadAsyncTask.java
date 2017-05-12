package com.sadussky.redux.rn.file;

import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;

import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

/**
 * Created by #!Sadu.Stephen on 2017/5/12.ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 *
 * @since v1.1.0
 */
public class FileUploadAsyncTask extends AsyncTask<FileUploadAsyncTask.Params, Integer, FileUploadAsyncTask.Result> {


    private static final String LOG_TAG = "FileUploadAsyncTask";
    private Context ctx;
    public final int CONS_STATU_SUCCESS = 0;
    public final int CONS_STATU_FAILURE = -1;

    public FileUploadAsyncTask(Context ctx) {
        this.ctx = ctx;
    }

    public static class Params {
        public String filePath;
        public String serverFilePath;
        public Callback callback;
    }

    public static class Result {
        public Exception exception;
        public int statu;
    }

    public static abstract class Callback {
        public void OnTaskCompleted(Result result) {
            Log.d(LOG_TAG, "OnTaskCompleted" + result.toString());
        }

        public void OnDownloadBegin(Params params) {
            Log.d(LOG_TAG, "OnDownloadBegin" + params.toString());
        }

        public void OnDownloadProgress(Integer progress) {
            Log.d(LOG_TAG, "OnDownloadProgress" + progress);
        }
    }


    @Override
    protected void onPreExecute() {
        super.onPreExecute();
    }

    @Override
    protected Result doInBackground(Params... params) {
        Result res = new Result();
        try {
            this.uploadFile(params[0], res);
            res.statu = CONS_STATU_SUCCESS;
            params[0].callback.OnTaskCompleted(res);
        } catch (Exception ex) {
            res.exception = ex;
            res.statu = CONS_STATU_FAILURE;
            params[0].callback.OnTaskCompleted(res);
            return res;
        }
        return res;
    }

    @Override
    protected void onPostExecute(Result result) {
        super.onPostExecute(result);
    }

    @Override
    protected void onProgressUpdate(Integer... values) {
        super.onProgressUpdate(values);
    }


    private void uploadFile(Params params, Result result) {
        String end = "/r/n";
        String Hyphens = "--";
        String boundary = "*****";
        try {
            URL url = new URL(params.serverFilePath);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            /* 允许Input、Output，不使用Cache */
            con.setDoInput(true);
            con.setDoOutput(true);
            con.setUseCaches(false);
            /* 设定传送的method=POST */
            con.setRequestMethod("POST");
            /* setRequestProperty */
            con.setRequestProperty("Connection", "Keep-Alive");
            con.setRequestProperty("Charset", "UTF-8");
            con.setRequestProperty("Content-Type",
                    "multipart/form-data;boundary=" + boundary);
            /* 设定DataOutputStream */
            DataOutputStream ds = new DataOutputStream(con.getOutputStream());
            ds.writeBytes(Hyphens + boundary + end);
            ds.writeBytes("Content-Disposition: form-data; name=\"uploadfile\"; filename=\""
                    + params.filePath.substring(params.filePath.lastIndexOf("/") + 1) + "\"" + end);
            ds.writeBytes(end);
            File file = new File(params.filePath);
            /* 取得文件的FileInputStream */
            FileInputStream fStream = new FileInputStream(file);
            /* 设定每次写入1024bytes */
            int bufferSize = 1024;
            byte[] buffer = new byte[bufferSize];
            int length = -1;
            long uploadLen = 0;
            long totalFileLen = file.length();
            /* 从文件读取数据到缓冲区 */
            while ((length = fStream.read(buffer)) != -1) {
            /* 将数据写入DataOutputStream中 */
                ds.write(buffer, 0, length);
                uploadLen += length;
                publishProgress((int) (uploadLen / totalFileLen * 100));
            }
            ds.writeBytes(end);
            ds.writeBytes(Hyphens + boundary + Hyphens + end);
            fStream.close();
            ds.flush();
            /* 取得Response内容 */
            InputStream is = con.getInputStream();
            int ch;
            StringBuffer b = new StringBuffer();
            while ((ch = is.read()) != -1) {
                b.append((char) ch);
            }
            ds.close();
        } catch (Exception e) {
            Log.e(LOG_TAG, e.getMessage(), e);
        }
    }
}


