import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Add } from "@/models/Add.js"
import { AppState } from "@/AppState.js"

class AddsService{
  async getAds() {
    AppState.adds = []
    const response = await api.get('api/ads')
    const adds = response.data.map(pojo=> new Add(pojo))
    AppState.adds = adds
  }
}

export const addsService = new AddsService()