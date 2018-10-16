<template>
    <div class="logistics-management">
        <div class="management">
            <p>后勤管理</p>
        </div>
        <div class="asset-management">
            <a href="#" class="asset">
                <img src="../../assets/home/assets.png">
                <p>资产管理</p>
            </a>
        </div>
        <div class="Consumables-management">
            <a href="#" class="Consumables">
                <img src="../../assets/home/consumables.png">
                <p>耗材管理</p>
            </a>
        </div>
        <div class="My-bag">
            <a href="#" class="bag">
                <img src="../../assets/home/wallet.png">
                <p>我的卡包</p>
            </a>
        </div>
        <div class="Campus-smart-card">
            <a href="#" class="card">
                <img src="../../assets/home/all-in-card.png">
                <p>校园一卡通</p>
            </a>
        </div>
        <div class="Printing-amount-of-collar">
            <a href="#" class="Printing">
                <img src="../../assets/home/goods.png">
                <p>领物印刷量</p>
            </a>
        </div>
        <div class="Logistic-inquiry-desk">
            <a href="#" class="inquiry">
                <img src="../../assets/home/diagnose.png">
                <p>后勤问诊台</p>
            </a>
        </div>
    </div>
</template>
<style lang="scss" scoped>
   @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .logistics-management{
        width: px2rem(750px);
        height: px2rem(422px);
        margin-top: px2rem(16px);
        background: white;
    }
    .management{
        width: px2rem(640px);
        height: px2rem(44px);
        float: left;
        padding-top: px2rem(28px);
        margin-left: px2rem(32px);
    }
    .management p{
        font-weight: Bold;
        font-size: px2rem(28px);
        font-family: Yu Gothic;
    }
    .asset-management{
        width: px2rem(120px);
        height: px2rem(120px);
        float: left;
        text-align: center;
        margin-left: px2rem(60px);
        margin-top: px2rem(30px);
    }
    .asset{
        width: px2rem(120px);
        height: px2rem(120px);
        display: block;
    }
    .asset p{
        font-size: px2rem(24px);
        color: #555555;
        text-align: center;
        font-family: Yu Gothic;
    }

    .Consumables-management{
        width: px2rem(120px);
        height: px2rem(120px);
        float: left;
        text-align: center;
        margin-left: px2rem(60px);
        margin-top: px2rem(30px);
    }
    .Consumables{
        width: px2rem(120px);
        height: px2rem(120px);
        display: block;
    }
    .Consumables p{
        font-size: px2rem(24px);
        color: #555555;
        text-align: center;
        font-family: Yu Gothic;
    }

    .My-bag{
        width: px2rem(120px);
        height: px2rem(120px);
        float: left;
        text-align: center;
        margin-left: px2rem(60px);
        margin-top: px2rem(30px);
    }
    .bag{
        width: px2rem(120px);
        height: px2rem(120px);
        display: block;
    }
    .bag p{
        font-size: px2rem(24px);
        color: #555555;
        text-align: center;
        font-family: Yu Gothic;
    }

    .Campus-smart-card{
        width: px2rem(120px);
        height: px2rem(120px);
        float: left;
        text-align: center;
        margin-left: px2rem(60px);
        margin-top: px2rem(30px);
    }
    .card{
        width: px2rem(120px);
        height: px2rem(120px);
        display: block;
    }
    .card p{
        font-size: px2rem(24px);
        color: #555555;
        text-align: center;
        font-family: Yu Gothic;
    }
    .Printing-amount-of-collar{
        width: px2rem(120px);
        height: px2rem(120px);
        float: left;
        text-align: center;
        margin-left: px2rem(60px);
        margin-top: px2rem(30px);
    }
    .Printing{
        width: px2rem(120px);
        height: px2rem(120px);
        display: block;
    }
    .Printing p{
        font-size: px2rem(24px);
        color: #555555;
        text-align: center;
        font-family: Yu Gothic;
    }
    .Logistic-inquiry-desk{
        width: px2rem(120px);
        height: px2rem(120px);
        float: left;
        text-align: center;
        margin-left: px2rem(60px);
        margin-top: px2rem(30px);
    }
    .inquiry{
        width: px2rem(120px);
        height: px2rem(120px);
        display: block;
    }
    .inquiry p{
        font-size: px2rem(24px);
        color: #555555;
        text-align: center;
        font-family: Yu Gothic;
    }
</style>
