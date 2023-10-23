import { Button } from "../../components/ui/button";
import { Github, Wand2 } from "lucide-react";
import { Separator } from "../../components/ui/separator";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Slider } from "../../components/ui/slider";
import { VideoInputForm } from "../../components/video-input-form";
import { PromptSelect } from "../../components/prompt-select";
import { useEffect, useState } from "react";
import { useCompletion } from "ai/react";
import { Navbar } from "@/components/navbar";

export function VideosAppPage() {
  const [temperature, setTemperature] = useState(0.5);
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {})();
  }, []);

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: "http://localhost:3333/ai/complete/video",
    body: {
      videoId,
      temperature,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-6 flex gap-6">
        <section className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              placeholder="Type your prompt here"
              className="resize-none p-4 leading-relaxed"
              value={input}
              onChange={handleInputChange}
            />
            <Textarea
              readOnly
              placeholder="Result generated by AI"
              className="resize-none p-4 leading-relaxed"
              value={completion}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Pro tip: You can use{" "}
            <code className="text-violet-400">
              {"{"}transcription{"}"}
            </code>{" "}
            tag on your prompt to add the transcription of the audio
          </p>
        </section>

        <aside className="w-80 flex flex-col gap-6">
          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label>Prompt</Label>
              <PromptSelect type="video" onPromptSelected={setInput} />
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <Label>Model</Label>
              <Select disabled defaultValue="gpt3.5">
                <SelectTrigger>
                  <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-xs text-muted-foreground italic">
                Coming soon the option to choose the model
              </span>
            </div>

            <Separator />

            <div className="flex flex-col gap-4">
              <Label>Temperature</Label>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={([value]) => setTemperature(value)}
              />

              <span className="text-xs text-muted-foreground italic leading-relaxed">
                Higher temperature means the AI will be more creative
              </span>
            </div>

            <Separator />

            <Button disabled={isLoading || !videoId} type="submit">
              Generate
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  );
}
