<template>
    <view class="form-container">
        <!-- 标题 -->
        <h1>欢迎参加情绪状态评估</h1>
        <p>请选择您当前的情绪状态：</p>

        <!-- 表单 -->
        <form @submit.prevent="submitForm">
            <!-- 六种情绪状态选项 -->
            <label v-for="(mood, index) in moods" :key="index">
                <radio :value="mood.value" :checked="selectedMood === mood.value" @click="selectedMood = mood.value" />
                {{ mood.label }}
            </label>

            <!-- 提交按钮 -->
            <button type="primary" :disabled="!selectedMood">提交</button>
        </form>

        <!-- 提示信息 -->
        <view v-if="message" class="message">{{ message }}</view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            selectedMood: '', // 用户选择的情绪状态
            message: '', // 提示信息
            moods: [
                { value: 'happy', label: '开心' },
                { value: 'sad', label: '悲伤' },
                { value: 'angry', label: '生气' },
                { value: 'calm', label: '平静' },
                { value: 'anxious', label: '焦虑' },
                { value: 'excited', label: '兴奋' }
            ]
        };
    },
    methods: {
        // 表单提交时触发的函数
        submitForm() {
            console.log('submitForm 被调用了'); // 添加调试日志
            if (!this.selectedMood) {
                this.message = '请先选择一个情绪状态！';
                return;
            }

            // 使用 uniCloud 调用云函数发送数据到数据库
            uniCloud.callFunction({
                name: 'saveMood', // 云函数名称
                data: {
                    mood: this.selectedMood // 将选中的情绪发送给云函数
                }
            }).then(res => {
                console.log('云函数调用成功', res); // 添加调试日志
                this.message = '提交成功，感谢您的参与！';
                this.selectedMood = ''; // 清空选择
            }).catch(err => {
                console.error('云函数调用失败', err); // 添加调试日志
                this.message = '提交失败，请稍后再试！';
            });
        }
    }
};
</script>

<style>
/* 页面样式 */
.form-container {
    padding: 20px;
    text-align: center;
}

/* 单选框样式 */
label {
    display: block;
    margin: 10px 0;
}

/* 按钮样式 */
button {
    margin-top: 20px;
}

/* 提示信息样式 */
.message {
    display: block;
    margin-top: 10px;
    color: #333;
    font-size: 16px;
}
</style>