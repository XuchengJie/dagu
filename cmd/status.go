package main

import (
	"log"

	"github.com/yohamta/dagu/internal/config"
	"github.com/yohamta/dagu/internal/controller"
	"github.com/yohamta/dagu/internal/models"

	"github.com/urfave/cli/v2"
)

func newStatusCommand() *cli.Command {
	return &cli.Command{
		Name:  "status",
		Usage: "dagu status <config>",
		Action: func(c *cli.Context) error {
			config_file_path := c.Args().Get(0)
			cl := &config.Loader{BaseConfig: globalConfig.BaseConfig}
			cfg, err := cl.Load(config_file_path, "")
			if err != nil {
				return err
			}
			return queryStatus(cfg)
		},
	}
}

func queryStatus(cfg *config.Config) error {
	status, err := controller.New(cfg).GetStatus()
	if err != nil {
		return err
	}
	res := &models.StatusResponse{
		Status: status,
	}
	log.Printf("Pid=%d Status=%s", res.Status.Pid, res.Status.Status)
	return nil
}
