import AppearanceSwitch from "@/components/part/appearance-switch"
import LanguageSwitch from "@/components/part/language-switch"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import * as z from "zod"

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
  remember: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

export default function App() {
  const { t } = useTranslation()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      remember: true,
    },
  })

  function onSubmit(values: FormValues) {
    toast(`username: ${values.username}, password: ${values.password}`)
  }

  return (
    <div className="h-full flex flex-col pt-36 items-center">
      <div className="flex gap-x-3 items-center">
        <img src="/logo.svg" alt="logo" className="w-12 h-12" />
        <h1 className="text-3xl font-bold">{t("common.title")}</h1>
      </div>
      <div className="mt-16 self-start w-80 mx-auto">
        <div className="space-x-8 mb-2">
          <button className="border-b-2 border-primary pb-1">
            {t("auth.login")}
          </button>
          <button className="pb-1 text-muted cursor-not-allowed">
            {t("auth.register")}
          </button>
        </div>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder={t("auth.input-account")}
                        className="pl-8"
                        {...field}
                      />
                      <span className="i-carbon-user text-[1.25rem] text-foreground absolute inset-0 top-1/2 -translate-y-1/2 left-2"></span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="password"
                        placeholder={t("auth.input-password")}
                        className="pl-8"
                        {...field}
                      />
                      <span className="i-carbon-password text-[1.25rem] text-foreground absolute inset-0 top-1/2 -translate-y-1/2 left-2"></span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="remember">
                        {t("auth.remember-password")}
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {t("auth.login")}
            </Button>
          </form>
        </Form>
      </div>
      <div className="mt-8 flex gap-4">
        <AppearanceSwitch />
        <LanguageSwitch />
      </div>
    </div>
  )
}
