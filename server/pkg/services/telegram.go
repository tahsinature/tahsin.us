package services

import (
	"fmt"
	"strconv"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/tahsinature/tahsin.us/pkg/config"
	"github.com/tahsinature/tahsin.us/pkg/log"
)

type TelegramService struct{}

var (
	TELEGRAM_BOT_CHAT_ID int64
	bot                  *tgbotapi.BotAPI
)

func (tgbot TelegramService) Init() {
	var err error
	TELEGRAM_BOT_CHAT_ID, err = strconv.ParseInt(config.Telegram.CHAT_ID_ME_SERVER, 10, 64)
	if err != nil {
		panic(err)
	}
	bot, err = tgbotapi.NewBotAPI(config.Telegram.BOT_TOKEN)
	if err != nil {
		panic(err)
	}

	log.Telegram.Info(fmt.Sprintf("Authorized on account %s", bot.Self.UserName))
}

func (tgbot TelegramService) SendMessage(text string) {
	log.Telegram.Info("sending TG msg...")
	if config.Telegram.SEND {
		msg := tgbotapi.NewMessage(TELEGRAM_BOT_CHAT_ID, text)
		msg.DisableWebPagePreview = true
		_, err := bot.Send(msg)
		if err != nil {
			log.Telegram.Error(fmt.Errorf("error sending TG msg: %s", err.Error()))
		}
	}
}
